import { getQueryClient } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { PaymentView } from "@/modules/analytics/ui/views/payment-analaytics";

const Page = () => {

    const queryClient = getQueryClient();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <PaymentView />
        </HydrationBoundary>
    )
}

export default Page