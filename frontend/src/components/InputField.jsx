import '../css/InputField.css'
export default function InputField({ id, type, placeholder, value,handleChange }) {
    
    return (
        <input 
        id={id}
        type={type} 
        placeholder={placeholder} 
        value={value} 
        onChange={handleChange}
        />
    )
}

export function InputFieldCheckBox({
  id,
  type,
  placeholder,
  handleChange,
  checked,
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      checked={checked}
    />
  );
}