import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import ProPlanView from "./_components/ProPlanView";
import PricingClient from "./PricingClient";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

async function getUserData() {
  try {
    const user = await currentUser();
    if (!user) return { user: null, convexUser: null };
    const convexUser = await convex.query(api.users.getUser, { userId: user.id });
    // Convert Clerk user class to a plain object
    const safeUser = user ? JSON.parse(JSON.stringify(user)) : null;
    return { user: safeUser, convexUser };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { user: null, convexUser: null };
  }
}

export default async function PricingPage() {
  const { user, convexUser } = await getUserData();

  if (convexUser?.isPro) {
    return <ProPlanView />;
  }

  return <PricingClient user={user} convexUser={convexUser} />;
}
