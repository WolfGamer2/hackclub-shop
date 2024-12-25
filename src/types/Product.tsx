export interface Variant {
    id: number;
    variant_id: number;
    name: string;
    retail_price: string;
    size: string;
    color: string;
    product: {
        image: string;
    };
}

export interface Product {
    id: number;
    name: string;
    thumbnail_url: string;
    sync_variants?: Variant[];
}

export interface ProductDetail {
    id: number;
    external_id: string;
    name: string;
    variants: number;
    synced: number;
    thumbnail_url: string;
    is_ignored: boolean;
}
