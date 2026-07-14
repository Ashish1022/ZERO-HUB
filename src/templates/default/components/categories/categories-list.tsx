"use client"

import { CategoryCard } from "./category-card";

import { useTRPC } from "@/trpc/client"
import { generateTenantUrl } from "@/lib/utils";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

export const CategoriesList = ({ slug }: { slug: string }) => {

    const trpc = useTRPC();

    const { data } = useSuspenseInfiniteQuery(trpc.categories.getMany.infiniteQueryOptions(
        {
            slug: slug,
            limit: 12
        },
        {
            getNextPageParam: (lastPage) => lastPage.data.length > 0 ? lastPage.nextCursor : undefined
        }
    ))

    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {data.pages.flatMap((page) => page.data).map((category) => [
                <CategoryCard
                    key={category.slug}
                    name={category.name}
                    image={category.thumbnail?.url}
                    itemCount={category.productCount}
                    href={`${generateTenantUrl(slug)}/categories/${category.slug}`}
                    description={category.description}
                />,
                ...category.subcategories.map((subcat) => (
                    <CategoryCard
                        key={`subcat-${subcat.slug}`}
                        name={subcat.name}
                        image={subcat.thumbnail?.url}
                        itemCount={subcat.productCount}
                        href={`${generateTenantUrl(slug)}/categories/${subcat.slug}`}
                        description={subcat.description}
                    />
                ))
            ])}
        </div>
    )
}