export function Checkbox() {
  const handleChange = event => {
    console.log(event.target.checked);
  };

  return <input type="checkbox" onChange={handleChange} />;
}
