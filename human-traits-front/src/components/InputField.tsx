interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}



function InputField({ label, type, value, onChange }: InputFieldProps) {
    return (<>
        <div className="form-group">
            <label htmlFor={label} className="form-label">{label}</label>
            <input className="form-input" id={label} type={type} value={value} onChange={onChange} />
        </div>
    </>);
}

export default InputField;