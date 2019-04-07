/* eslint-disable react/no-string-refs */
import React from "react";

const musicUrl = `http://cdn-preview-1.deezer.com/stream/c-1fd3a7b13a90a5301ced29f8603d21c1-5.mp3`;

export default class AudioVisualizer extends React.Component {
  constructor (props) {
    super(props);
    this.createVisualization = this.createVisualization.bind(this);
  }

  componentDidMount () {
    this.createVisualization();
  }

  createVisualization () {
    this.context = new AudioContext();
    const analyser = this.context.createAnalyser();
    const canvas = this.refs.analyzerCanvas;
    const ctx = canvas.getContext("2d");
    const { audio } = this.refs;
    audio.crossOrigin = "anonymous";
    const audioSrc = this.context.createMediaElementSource(audio);
    audioSrc.connect(analyser);
    audioSrc.connect(this.context.destination);
    analyser.connect(this.context.destination);

    function renderFrame () {
      const freqData = new Uint8Array(analyser.frequencyBinCount);
      requestAnimationFrame(renderFrame);
      analyser.getByteFrequencyData(freqData);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createLinearGradient(20, 0, 220, 0);
      gradient.addColorStop(1, "#00f"); // black
      gradient.addColorStop(0.75, "#f00"); // red
      gradient.addColorStop(0.25, "#f00"); // yellow
      gradient.addColorStop(0, "#ffff00"); // white
      ctx.fillStyle = gradient;
      const bars = 80;
      for (let i = 0; i < bars; i++) {
        const barX = i * 4;
        const barWidth = 8;
        const barHeight = -(freqData[i] / 2);
        ctx.fillRect(barX, canvas.height, barWidth, barHeight);
      }
    }

    renderFrame();
  }

  render () {
    return (
      <div id="mp3_player">
        <div id="audio_box">
          <audio
            ref="audio"
            autoPlay
            loop
            src={musicUrl}
          />
        </div>
        <canvas
          ref="analyzerCanvas"
          id="analyzer"
        />
        <button onClick={this.context && this.context.play()}>
          Play
        </button>
      </div>
    );
  }
}