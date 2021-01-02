$(function () {
  var layer = layui.layer
  const $image = $('#image')
  const options = {
    aspectRatio: 1,
    preview: '.img-preview'
  }
  $image.cropper(options)
  $('#btnChooseImage').on('click', function () {
    $('#file').click()
  })
  $('#file').on('change', function (e) {
    var filelist = e.target.files
    if (filelist.length === 0) {
      return layer.msg('请选择图片')
    }
    var newimgUrl = URL.createObjectURL(filelist[0])
    $image.cropper('destroy').attr('src', newimgUrl).cropper(options)
  })
  $('#btnUpload').on('click', function () {
    const dataURL = $image
      .cropper('getCroppedCanVas', {
        width: 100,
        hight: 100
      })
      .toDataURL('image/png')
    $.ajax({
      type: 'post',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更换头像失败！')
        }
        layer.msg('更换头像成功！')
        window.parent.getUserInfo()
      }
    })
  })
})
