document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('saveButton').addEventListener('click', async function() {
        const svgElement = document.getElementById('003');
        const serializer = new XMLSerializer();
        let svgString = serializer.serializeToString(svgElement);

        // Fetch the font data
        const fontUrl = './assets/fonts/FiraSans-Light.woff2'; // Adjust the path as needed
        const fontData = await fetch(fontUrl).then(res => res.arrayBuffer());
        
        // Convert ArrayBuffer to Base64
        const u8 = new Uint8Array(fontData);
        let fontBase64 = '';
        for (let i = 0; i < u8.length; i++) {
            fontBase64 += String.fromCharCode(u8[i]);
        }
        fontBase64 = btoa(fontBase64);

        // Add font-face to SVG string
        const fontFace = `
            @font-face {
                font-family: 'fira';
                src: url('data:font/woff2;base64,${fontBase64}') format('woff2');
            }
        `;
        const styleTag = `<style type="text/css"><![CDATA[${fontFace}]]></style>`;
        svgString = svgString.replace(/<svg[^>]*>/, `$&${styleTag}`);

        // Create a Blob from the SVG string
        const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        // Create a link and trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'mySVG.svg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });
});
