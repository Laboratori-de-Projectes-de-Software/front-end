import UIBLong from '../assets/UIB-long.png';
import GithubLogo from '../assets/github.png';
export default function Footer() {

    return (
        <>
            <div>
                <ul className="layout">
                    <li className="layout">
                        <a
                            href="https://www.uib.cat"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={UIBLong}
                                style={{ width: "250px", height: "101px" }}

                            />
                        </a>
                    </li>
                    <li className="layout">
                        <a
                            href="https://www.github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={GithubLogo}
                                style={{ width: "101px", height: "101px" }}

                            />
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}