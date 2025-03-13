const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-(--navbar)">
            <div className="text-xl font-bold">Nombre web</div>
            <ul className="flex space-x-4">
                <li>Ligas</li>
                <li>Participantes</li>
            </ul>
            <div className="flex items-center">
                <span>Icono</span>
            </div>
        </nav>
    )
}

export default Navbar;