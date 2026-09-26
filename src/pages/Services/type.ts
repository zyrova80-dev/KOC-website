export interface Service {
    id?: string;

    title: string;

    shortDescription: string;

    fullDescription: string;

    icon: string;

    displayOrder: number;

    featured: boolean;

    active: boolean;

    createdAt?: Date;
}

export const defaultService: Service = {
    title: "",
    shortDescription: "",
    fullDescription: "",
    icon: "",
    displayOrder: 1,
    featured: false,
    active: true,
};