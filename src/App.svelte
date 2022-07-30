<script>
  import QRCode from "qrcode-svg";
  var svgContent = "";
  var svgCode = "";
  var ecl = "L";
  $: svgCode = svgContent.length > 0 && new QRCode({ content: svgContent, ecl }).svg();
  async function shareQr() {
    const blob = new Blob([svgCode], { type: "image/svg+xml" });
    const filesArray = [new File([blob], "qrcode.svg", { type: "image/svg+xml" })];
    const shareData = {
      files: filesArray,
    };
    navigator.share(shareData);
  }
</script>

<main>
  <input type="text" bind:value={svgContent} placeholder="data to encode" autofocus /><br />
  {#if svgCode}
    <img src={`data:image/svg+xml;base64,${btoa(svgCode)}`} alt="" />
    <p>right click or press and hold on the qr code to save it as an svg</p>
    <button on:click={(_) => shareQr()}>share</button>
  {/if}
  <div>
    error correction level:
    <select bind:value={ecl}>
      <option value="L">low</option>
      <option value="M">medium</option>
      <option value="Q">q</option>
      <option value="H">high</option>
    </select>
  </div>
</main>

<style>
  main {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
    gap: 8px;
    text-align: center;
  }
  main > * {
    width: 100%;
  }
  input {
    font-size: 1.5em;
  }
  button {
    padding: 8px;
  }
</style>
