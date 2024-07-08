import './styleSlider.css'
export const Slider = () => {
  return (
    <div className="speed-slider slider-container">
      <div className="slider">
        <input className="slider-input" type="range" min="0" max="100" name="speed" />
        <progress className="slider-progress" min="0" max="100" value="100"></progress>
      </div>
      <div className="slider-indicator">100</div>
    </div>
  )
}