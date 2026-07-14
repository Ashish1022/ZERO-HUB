import { getQueryClient } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { CustomerView } from "@/modules/analytics/ui/views/customer-analytics";

const Page = () => {

    const queryClient = getQueryClient();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CustomerView />
        </HydrationBoundary>
    )
}

export default Page