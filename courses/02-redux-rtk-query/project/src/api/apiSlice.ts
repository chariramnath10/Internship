import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { mockApi, type User, type Post } from "./mockServer";

export const apiSlice = createApi({
  reducerPath: "api",

  tagTypes: ["User", "Post"],

  baseQuery: fakeBaseQuery(),

  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      queryFn: async () => {
        try {
          const data = await mockApi.getUsers();
          return { data };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error instanceof Error ? error.message : "Unknown error",
            },
          };
        }
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "User" as const,
                id,
              })),
              { type: "User" as const, id: "LIST" },
            ]
          : [{ type: "User" as const, id: "LIST" }],
    }),

    getPosts: builder.query<Post[], void>({
      queryFn: async () => {
        try {
          const data = await mockApi.getPosts();
          return { data };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error instanceof Error ? error.message : "Unknown error",
            },
          };
        }
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Post" as const,
                id,
              })),
              { type: "Post" as const, id: "LIST" },
            ]
          : [{ type: "Post" as const, id: "LIST" }],
    }),

    addPost: builder.mutation<Post, Omit<Post, "id">>({
      queryFn: async (post) => {
        try {
          const data = await mockApi.createPost(post);
          return { data };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error instanceof Error ? error.message : "Unknown error",
            },
          };
        }
      },

      async onQueryStarted(post, { dispatch, queryFulfilled }) {
        const optimisticPost: Post = {
          ...post,
          id: Date.now(),
        };

        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
            draft.push(optimisticPost);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

      invalidatesTags: [{ type: "Post" as const, id: "LIST" }],
    }),
  }),
});

export const { useGetUsersQuery, useGetPostsQuery, useAddPostMutation } =
  apiSlice;
