interface Props {
    children: React.ReactNode;
}

export default function TableHead({
    children
}: Props) {

    return (

        <thead>

            {children}

        </thead>

    );

}