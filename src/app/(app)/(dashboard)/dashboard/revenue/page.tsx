import { getQueryClient } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { RevenueView } from "@/modules/analytics/ui/views/revenue-view";

const Page = () => {

    const queryClient = getQueryClient();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <RevenueView />
        </HydrationBoundary>
    )
}

export default Page