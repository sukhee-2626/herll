$content = Get-Content 'index.html' -Raw -Encoding UTF8
# Add the CSS link after the existing CSS
$content = $content -replace '(\u003clink href="css/eterna-stage\.webflow\.shared.*?\.css"[^\u003e]*\u003e)', '$1`n    \u003clink href="qlystra-branding.css" rel="stylesheet" type="text/css"\u003e'
# Replace the SVG logo with styled text
$content = $content -replace '\u003cdiv class="image w-embed"\u003e\u003csvg.*?Qlystra Technologies.*?\u003c/svg\u003e\u003c/div\u003e', '\u003cdiv class="image w-embed"\u003e\u003cspan class="qlystra-brand-text"\u003eQlystra Technologies\u003c/span\u003e\u003c/div\u003e'
Set-Content 'index.html' -Value $content -Encoding UTF8 -NoNewline
Write-Host "Updated successfully!"
