// // app/components/HeaderWrapper.tsx
// import { currentUser } from "@clerk/nextjs/server";
// import { ConvexHttpClient } from "convex/browser";
// import { api } from "../../../convex/_generated/api";
// import Header from "./Header";

// export default async function HeaderWrapper() {
//   // Try to get the authenticated Clerk user
//   const user = await currentUser();

//   // Only query Convex if there's a logged-in user
//   let convexUser = null;
//   if (user?.id) {
//     const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
//     convexUser = await convex.query(api.users.getUser, {
//       userId: user.id,
//     });
//   }

//   // Pass either the fetched object or null
//   return <Header convexUser={convexUser} />;
// }
