import style from "./Upload.module.css";

export function Upload() {
    return (
        <div>
            <div className={style.background}>
                <div className={style.upload}>
                    <h2>Upload your bot</h2>
                    <input type="file" accept=".pn" />
                </div>
            </div>
        </div>
    );
}