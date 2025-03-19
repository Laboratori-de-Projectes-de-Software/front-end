const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-(--navbar) h-20">
            <div className="flex space-x-8 content-center">
                <a href="/"><span className="text-xl font-bold">Web name</span></a>
                <ul className="flex space-x-4">
                    <li><a href="/classification">Leagues</a></li>
                    <li><a href="/participants">Participants</a></li>
                </ul>
            </div>
            <div className="flex items-center">
                <span>Icon</span>
            </div>
        </nav>
    )
}

export default Navbar;