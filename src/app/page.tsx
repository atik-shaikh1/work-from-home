export default function Page() {
  return <>
    <div className="container">
      <h1>Work Hours Calculator</h1>
      <form id="workForm">
        <label>Hours Worked in Office:</label>
        <input type="number" id="officeHours" name="officeHours" required />

        <label >Start Time Working from Home:</label>
        <input type="time" id="homeStartTime" name="homeStartTime" required />

        <button type="submit">Calculate End Time</button>
      </form>
      <div id="result"></div>
    </div>

  </>
}