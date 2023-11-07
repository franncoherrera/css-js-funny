/*
  Inspired by: "Xray"
  By: Irina Mir
  Link: https://dribbble.com/shots/4471897-Xray
*/

let scan = document.querySelector('.scan')

let skeleton = document.querySelector('#skeleton')
let { x: skeletonX, y: skeletonY } = skeleton.getBoundingClientRect()

function updateScan () {
  // let [clipPathX, clipPathY] = skeleton.style
  //                                      .clipPath
  //                                      .split('at')[1]
  //                                      .split(')')[0]
  //                                      .trim()
  //                                      .split(' ')
  //                                      .map(position => parseFloat(position))
  
  let [computedY, , , computedX] = skeleton.style
                                           .clipPath
                                           .split('(')[1]
                                           .split(')')[0]
                                           .split(' ')
                                           .map(position => Number(position.replace('px', '').trim()))
  
  let clipPathX = computedX + 50
  let clipPathY = computedY + 50

  scan.style.setProperty('--x', skeletonX + clipPathX - 50 + 'px')
  scan.style.setProperty('--y', skeletonY + clipPathY - 50 + 'px')  
}

addEventListener('mousemove', event => {
    let { clientX, clientY } = event

    // skeleton.style.clipPath = `circle(50px at ${clientX - skeletonX}px ${clientY - skeletonY}px)`
    skeleton.style.clipPath = `inset(${clientY - skeletonY - 50}px ${400 - (clientX - skeletonX) - 50}px ${584 - (clientY - skeletonY) - 50}px ${clientX - skeletonX - 50}px round 15px)`

    scan.style.setProperty('--x', clientX - 50 + 'px')
    scan.style.setProperty('--y', clientY - 50 + 'px')
})

addEventListener('resize', event => {
  ({ x: skeletonX, y: skeletonY } = skeleton.getBoundingClientRect())
  updateScan()
})

function init () {
  // skeleton.style.clipPath = 'circle(50px at 240px 210px)'
  skeleton.style.clipPath = 'inset(155px 119px 330px 182px round 15px)'
  updateScan()
}

init()