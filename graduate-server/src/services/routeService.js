


const MAP = {
  "2":[
      [126.97903434838673, 37.56708315073645],
      [126.97915318911663, 37.567815397568666],
      [126.97947725776118, 37.5678576032434],
      [126.97979189258245, 37.56787987016604],
      [126.97979751106118, 37.567670560833974],
      [126.97979751106118, 37.5675280520164],
      [126.97979751106118, 37.56742562363566],
      [126.9798199849759, 37.567341008780105],
      [126.97990255616708, 37.56734830481747],
      [126.97997075658577, 37.567324519210345],
      [126.98004714105429, 37.56731586989639],
      [126.98011261345624, 37.56731370756789],
      [126.98019172594138, 37.56731370756789],
      [126.98026811040984, 37.56731370756789],
      [126.98038268711264, 37.56733316852268],
      [126.98048089571392, 37.56733533085058],
      [126.98055728018244, 37.56730073359495],
      [126.98059001638342, 37.567404525314274],
      [126.98059252605282, 37.567483424365435],
      [126.9805975519717, 37.56753882330942],
      [126.98064848795377, 37.5675592784946],
      [126.9806698575394, 37.56761736896887],
      [126.98068508657582, 37.56765362336239],
      [126.98062098828706, 37.56769068408559],
      [126.98052556781585, 37.567734333025655],
      [126.980423895147, 37.5677554109879],
      [126.98032975894415, 37.56778024327269],
      [126.98026477262016, 37.56779371570909],
      [126.98016870587873, 37.56781363147927],
      [126.97985247034586, 37.567897836490246]
    ]
  
}
const STATUS = {
  '2':false
}

export function startRoute(params, {id}){
  console.log('start')
  STATUS[id] = true
}

export function endRoute(params, {id}){
  console.log('end')
  STATUS[id] = false
}

export function moveRoute({lng, lat}, {id}){
  console.log(MAP)
  console.log(STATUS[id])
  if(!STATUS[id]) return;
  if( MAP[id] === undefined ) MAP[id] = [];
  else if(MAP[id].length){
    const lastPoint = MAP[id][MAP[id].length-1]
    
    const dist = getDistance(lastPoint, [lng,lat])
    
    if(dist > 0) MAP[id].push([lng, lat]);
  }else MAP[id].push([lng, lat]);
  return true
}
function getDistance(point1, point2){
  return (Math.sqrt((
    point1[0] - point2[0])*(point1[0] - point2[0]) +
    (point1[1] - point2[1])*(point1[1] - point2[1])
  ))
}

export async function getRoute(){
  return Object.entries(MAP).reduce( (prev, [key, value]) => ({...prev, [key]:makeFeatureCollection(value)}) , {})
}

function makeFeatureCollection(coordinates){
  return { type: "FeatureCollection", features:[
    {
      type: 'Feature',
      properties: { },
      geometry: { type:'LineString', coordinates}
    }
  ]};
}