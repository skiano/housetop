// const patches = [
//   ['up', [{ w: 100, h: 200 }, { w: 10, h: 10} ]],  
//   ['down', [{ w: 100, h: 200 }, { w: 10, h: 10} ]],
//   ['left', [{ w: 100, h: 200 }, { w: 10, h: 10} ]],
//   ['right', [{ w: 100, h: 200 }, { w: 10, h: 10} ]],
// ]
// 
// const patches = [
//   ['north', [{ w: 100, h: 200 }, { w: 10, h: 10} ]],  
//   ['south', [{ w: 100, h: 200 }, { w: 10, h: 10} ]],
//   ['east', [{ w: 100, h: 200 }, { w: 10, h: 10} ]],
//   ['west', [{ w: 100, h: 200 }, { w: 10, h: 10} ]],
// ]

const patches = [
  ['U', [{ w: 100, h: 200 }, { w: 10, h: 10} ]],  
  ['D', [{ w: 100, h: 200 }, { w: 10, h: 10} ]],
  ['L', [{ w: 100, h: 200 }, { w: 10, h: 10} ]],
  ['R', [{ w: 100, h: 200 }, { w: 10, h: 10} ]],
]

// horizontal refers to the flow of the cells
// not the build direction, it is tangent to the build
const HORISONTAL_RE = /U|D/

const each = (arr, fn) => {
  for (let i = 0; i < arr.length; i++) {
    fn(arr[i], i)
  }
}

// each(patches, ([dir, cells]) => {
//   const isHORIZONTAL = HORISONTAL_RE.test(dir)
// 
//   let pG = -1
//   let pL = 0
//   each(cells, (c) => {
//     pL += isHORIZONTAL ? (c.w / c.h) : (c.h / c.w)
//     pG += 1
//   })
// 
//   console.log('patch gutters', pG)
//   console.log('patch width', 1)
//   console.log('patch length', pL)
// })

let wG = -1
let wL = 0

let hG = -1
let hL = 0

each(patches, ([dir, cells]) => {
  console.log(`creating a ${dir} patch`)
  const isHorizontal = HORISONTAL_RE.test(dir)

  let totalPatchLength = 0
  each(cells, (c) => {
    totalPatchLength += isHorizontal ? (c.w / c.h) : (c.h / c.w)
  })

  let g = 0
  each(cells, (c, i) => {
    const l = isHorizontal ? (c.w / c.h) : (c.h / c.w)
    const fraction = l / totalPatchLength
    console.log('fraction', fraction)
    g += 1
  })
})

// return a list of cells
// that look like this
// [
//   { x: 100, y: 20, w: 100, h: 100, ... },
//   { x: 100, y: 20, w: 100, h: 100, ... },
//   { x: 100, y: 20, w: 100, h: 100, ... },
// ]
