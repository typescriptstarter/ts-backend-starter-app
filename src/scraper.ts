
const axios = require("axios")

import * as cheerio from 'cheerio';

export interface Post {
  id: string;
  author: string;
  title: string;
  href: string;
  timestamp: string;
  thumbnail: string;
  content: {
    type: string;
    tweet?: string;
    video?: string;
    image?: string;
    link?: string;
  }
}

export async function topPosts(): Promise<Post[]> {

  const result = []

  const { data } = await axios.get('https://patriots.win')

  const $ = cheerio.load(data)

  const posts = $('.post-list .post')

  for (let i=0; i<posts.length; i++) {

    const post = $(posts[i])

    const id = post.attr('data-id')
    const title = post.find('.title').text().trim()
    const href = post.find('.title').attr('href')
    const thumbnail = post.find('.thumb img').attr('src')
    const author = post.find('.author').text().trim()
    const timestamp = post.find('.timeago').attr('datetime')

    var content;

    var tweet = $(post).find('.tweet').attr('data-tweet')

    if (tweet) {

      content = {
        type: 'tweet',
        tweet
      }

    }

    const image = $(post).find('.link img').attr('data-src')

    if (image) {

      content = {
        type: 'image',
        image
      }

    }

    const video = $(post).find('.video-container').attr('data-src')

    if (video) {

      content = {
        type: 'video',
        video
      }

    }

    const link = $(post).find('.link a').attr('href')

    if (link) {

      content = {
        type: 'link',
        link
      }

    }

    result.push({
      id,
      title,
      href,
      timestamp,
      thumbnail,
      author,
      content
    })

  }

  return result

}
