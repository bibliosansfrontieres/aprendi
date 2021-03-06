const $ = require('jquery')

export const youtubeGetId = url => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  }
  return 'error';
}

export const vimeoGetId = url => {
  const regExp = /(player\.|www\.)?vimeo.com(\/video)?\/(\d+)/;
  const match = url.match(regExp);

  if (match) {
    return match[match.length - 1]
  }
  return 'error'
}

const processVideoUrl = url => {
  if (url.match(/youtu/)) {
    const id = youtubeGetId(url)

    return {video_provider: 'youtube', resource_url: `https://www.youtube.com/embed/${id}`, resource_id: id}
  } else if (url.match(/vimeo/)) {
    const id = vimeoGetId(url)

    return {video_provider: 'vimeo', resource_url: `https://player.vimeo.com/video/${id}`, resource_id: id}
  }

  return null
}

const getVimeoScreenshot = id => new Promise(resolve => {
  $.get(`http://vimeo.com/api/v2/video/${id}.json?callback=showThumb`, results => {
    resolve(JSON.parse(results.substring(15, results.length - 2)).thumbnail_large)
  })
})

const processFormData = (data, action, resourceUrlChanged, imageUrlChanged) => new Promise(resolve => {
  if (!resourceUrlChanged && !imageUrlChanged) {
    resolve(data)
    return
  }

  const retObject = {}
  Object.assign(retObject, data)

  if (resourceUrlChanged) {
    switch (retObject.resource_type) {
      case 'video':
        const results = processVideoUrl(data.resource_url)
        retObject.video_provider = results.video_provider
        retObject.resource_url = results.resource_url

        if (results.video_provider === 'youtube') {
          retObject.image_url = `https://img.youtube.com/vi/${results.resource_id}/0.jpg`
          retObject.thumbnail_image_url = `https://img.youtube.com/vi/${results.resource_id}/0.jpg`
          resolve(retObject)
        } else {
          getVimeoScreenshot(results.resource_id).then(url => {
            retObject.image_url = url
            retObject.thumbnail_image_url = url
            resolve(retObject)
          })
        }
        return

      case 'website':
        retObject.thumbnail_image_url = retObject.image_url ? retObject.image_url.replace('/images/', '/thumbnail-images/') : null
        resolve(retObject)
        return

      case 'embed':
        retObject.thumbnail_image_url = retObject.image_url ? retObject.image_url.replace('/images/', '/thumbnail-images/') : null
        resolve(retObject)
        return

      case 'pdf':
        retObject.image_url = null
        retObject.thumbnail_image_url = retObject.resource_url.replace('/pdf/', '/thumbnail-images/').replace('.pdf', '.png')
        resolve(retObject)
        return
    }
  }

  if (imageUrlChanged) {
    retObject.thumbnail_image_url = retObject.image_url ? retObject.image_url.replace('/images/', '/thumbnail-images/') : null
    resolve(retObject)
    return
  }
  resolve(retObject)
  return
})

export default processFormData
