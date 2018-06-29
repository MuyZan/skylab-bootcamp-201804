let imgPreview = document.getElementById("img-preview")
let fileUpload = document.getElementById("file-upload")

fileUpload.addEventListener("change", (e) => {
    let file = e.target.files[0]
    console.log(e.target)
    console.log(file)
})