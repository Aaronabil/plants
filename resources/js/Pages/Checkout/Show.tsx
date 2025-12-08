import  DirectSearch from "@/Components/CheckoutDS";
import Checkout from "@/Components/Checkout";
import { usePage } from "@inertiajs/react";
import { PageProps, CartItem } from "@/types";

interface ShowProps extends PageProps {
    cartItems: CartItem[];
}

export default function Show() {
    const { auth, cartItems } = usePage<ShowProps>().props;
    const user = auth.user;

    return (
        <>
            <Checkout user={user} cartItems={cartItems} />
            {/* <DirectSearch /> */}
        </>
    );
}
