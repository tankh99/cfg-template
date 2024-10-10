'use client'

import { UserCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Link from "next/link";
import { useGetCurrentUser, useLogout } from "@/api/hooks/useAuth";
import { Button } from "../ui/button";

export default function Navbar() {
    const {data: isLoggedIn} = useGetCurrentUser();
    const logoutMutation = useLogout();

    return (
        <nav className='fixed top-0 w-screen h-12 bg-white px-6 flex items-center justify-between drop-shadow-md'>

            <Link href="/admin">
                <div>i2Eye</div>
            </Link>
            <div></div>
            {isLoggedIn ? (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="rounded-full p-[4px]">
                            <UserCircle strokeWidth={2} />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="m-3">
                        <DropdownMenuItem
                            onClick={() => {
                                logoutMutation.mutate()
                            }}
                        >
                            Log Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <div className="space-x-5">
                    <>
                        <Link href="/login">
                            <Button variant="outline">Log In</Button>
                        </Link>
                    </>
                </div>
            )}
        </nav>
    )
}
