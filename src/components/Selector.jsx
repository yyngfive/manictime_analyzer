
export default function DropdownMenu({ label, options=['None'], setValue ,key}) {

    return (
        <div className="form-control w-30 max-w-xs place-self-end" key={key}>
            {label && <label className="label">
                <span className="label-text">{label}</span>
                </label>}
            <select className="select select-bordered" defaultValue={options[0]} onChange={setValue}>
                {options.map((e,i)=>(
                    <option key={i}>{e}</option>
                ))}
            </select>
        </div>
    );
}