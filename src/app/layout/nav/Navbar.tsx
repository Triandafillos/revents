import { NavLink, useNavigate } from "react-router";
import UserMenu from "./UserMenu";
import { useAppDispatch, useAppSelector } from "../../../lib/stores/store";
import { signIn } from "../../../features/account/accountSlice";
import { selectEvent } from "../../../features/events/eventSlice";

export default function Navbar() {
    const navigate = useNavigate();
    const user = useAppSelector(state => state.account.user);
    const dispatch = useAppDispatch();

    const handleSignIn = () => {
        dispatch(signIn());
        navigate('/events');
    }

    return (
        <header className="px-3 w-full fixed top-0 z-50 bg-linear-to-r from-primary to-black">
            <div className="flex align-middle items-center px-10 mx-auto gap-6 cursor-pointer">
                <div className="max-h-16 text-white flex items-center gap-3 border-r-white border-r-2 pr-6 my-4">
                    <NavLink to='/' className="text-white text-2xl font-semibold uppercase">Re-vents</NavLink>
                </div>
                <nav className="flex my-2 gap-3 text-white uppercase text-lg">
                    <NavLink to='/events' end>Events</NavLink>
                    <NavLink to='/createEvent'>Create</NavLink>
                </nav>
                <div className="flex align-middle gap-3 ml-auto">
                    {user ? (
                        <UserMenu />
                    ) : (
                        <>
                            <button onClick={handleSignIn} className="btn">Login</button>
                            <button className="btn">Register</button>
                        </>
                    )}
                </div>
            </div>
        </header>

    )
}