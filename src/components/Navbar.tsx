const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-(--navbar) h-20">
            <div className="flex space-x-8 content-center">
                <span className="text-xl font-bold">Nombre web</span>
                <ul className="flex space-x-4">
                    <li><a href="/leagues">Ligas</a></li>
                    <li><a href="/participants">Participantes</a></li>
                </ul>
            </div>
            <div className="flex items-center">
                <span>Icono</span>
            </div>
        </nav>
    )
}

export default Navbar;