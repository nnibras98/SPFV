import React, { useEffect, useRef } from 'react'
import { useState  } from 'react'
import { getGrid } from '../../utils/startinggrid'
import './grid.css'
import { useParams } from '../../context/context'

export default function Grid() {

  const {grid,setgrid,editing,seteditFlag,mode,start,end,run,res,algo}  = useParams()

  const [refarray,mm]=useState(getrefarray(grid))
  
  function getrefarray(grid){
    let array=[]
   grid.forEach((elem)=>{
    elem.forEach((child)=>{
      array.push(useRef())
    })
   })
   return array
 }

 function manhattanDistance(node, end) {
  return Math.abs(node.x - end.x) + Math.abs(node.y - end.y);
}

function aStar(grid, start, end, refarray) {
  const openSet = [];
  const closedSet = new Set();
  const cameFrom = new Map();
  const gScore = new Map();
  const fScore = new Map();

  const nodeKey = (node) => `${node.x}-${node.y}`;

  gScore.set(nodeKey(start), 0);
  fScore.set(nodeKey(start), manhattanDistance(start, end));

  openSet.push({ ...start, fScore: fScore.get(nodeKey(start)) });

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.fScore - b.fScore);
    const current = openSet.shift();
    const currentKey = nodeKey(current);

    if (current.x === end.x && current.y === end.y) {
      // Found the path
      return reconstructPath(cameFrom, current);
    }

    closedSet.add(currentKey);

    // Neighbor positions
    const neighbors = [
      { x: current.x + 1, y: current.y },
      { x: current.x - 1, y: current.y },
      { x: current.x, y: current.y + 1 },
      { x: current.x, y: current.y - 1 },
    ].filter(({ x, y }) => x >= 0 && x < 50 && y >= 0 && y < 25 && !grid[y][x].iswall);

    for (const neighbor of neighbors) {
      const neighborKey = nodeKey(neighbor);

      if (closedSet.has(neighborKey)) continue;

      const tentativeGScore = gScore.get(currentKey) + 1; // Assume cost of 1 for moving from current to neighbor

      if (!openSet.find((elem) => nodeKey(elem) === neighborKey)) {
        openSet.push(neighbor);
      } else if (tentativeGScore >= gScore.get(neighborKey)) {
        continue; // This is not a better path.
      }

      // This path is the best until now. Record it!
      cameFrom.set(neighborKey, current);
      gScore.set(neighborKey, tentativeGScore);
      fScore.set(neighborKey, gScore.get(neighborKey) + manhattanDistance(neighbor, end));

      neighbor.fScore = fScore.get(neighborKey); // Update fScore for sorting
    }
  }

  return []; // Failed to find a path
}

function reconstructPath(cameFrom, current) {
  const totalPath = [current];
  while (cameFrom.has(`${current.x}-${current.y}`)) {
    current = cameFrom.get(`${current.x}-${current.y}`);
    totalPath.unshift(current);
  }
  return totalPath;
}



  function BFS(graph,hashmap,prevmap,start,target){
    let queue=[start]
    let count=0
    hashmap[`${start.x}-${start.y}`]=true
    while (queue.length > 0){
      count+=1
      let c=queue.pop()
      refarray[c.x+c.y*50].current.style['transition-delay']=`${count * 8}ms`
      refarray[c.x+c.y*50].current.classList.add('visited')
      if (c.x == target.x && c.y == target.y) return [c,count]
 
      if(c.x+1 < 50 && !hashmap[`${c.x+1}-${c.y}`] && !graph[c.y][c.x+1].iswall){
        queue.unshift({x:c.x +1,y:c.y})
        prevmap[`${c.x+1}-${c.y}`]={...c}
        hashmap[`${c.x+1}-${c.y}`]=true
      }
      if(c.x-1 >=0 && !hashmap[`${c.x-1}-${c.y}`] && !graph[c.y][c.x-1].iswall){
        queue.unshift({x:c.x -1,y:c.y})
        prevmap[`${c.x-1}-${c.y}`]={...c}
        hashmap[`${c.x-1}-${c.y}`]=true
      }
      if(c.y+1 < 25 && !hashmap[`${c.x}-${c.y+1}`] && !graph[c.y+1][c.x].iswall){
        queue.unshift({x:c.x ,y:c.y+1})
        prevmap[`${c.x}-${c.y+1}`]={...c}
        hashmap[`${c.x}-${c.y+1}`]=true
      }
      if(c.y-1 >=0 && !hashmap[`${c.x}-${c.y-1}`] && !graph[c.y-1][c.x].iswall){
        queue.unshift({x:c.x ,y:c.y-1})
        prevmap[`${c.x}-${c.y-1}`]={...c}
        hashmap[`${c.x}-${c.y-1}`]=true
      }
    }
    return null
  }

  function BDS(graph,hashmap,prevmap,start,target){
    let queue=[start]
    let count=0
    hashmap[`${start.x}-${start.y}`]=true
    while (queue.length > 0){
      count+=1
      let c=queue[0]
      queue.shift()
      refarray[c.x+c.y*50].current.style['transition-delay']=`${count * 8}ms`
      refarray[c.x+c.y*50].current.classList.add('visited')
      if (c.x == target.x && c.y == target.y) return [c,count]
 
      
      
      if(c.y+1 < 25 && !hashmap[`${c.x}-${c.y+1}`] && !graph[c.y+1][c.x].iswall){
        queue.unshift({x:c.x ,y:c.y+1})
        prevmap[`${c.x}-${c.y+1}`]={...c}
        hashmap[`${c.x}-${c.y+1}`]=true
      }
      if(c.x-1 >=0 && !hashmap[`${c.x-1}-${c.y}`] && !graph[c.y][c.x-1].iswall){
        queue.unshift({x:c.x -1,y:c.y})
        prevmap[`${c.x-1}-${c.y}`]={...c}
        hashmap[`${c.x-1}-${c.y}`]=true
      }
      if(c.y-1 >=0 && !hashmap[`${c.x}-${c.y-1}`] && !graph[c.y-1][c.x].iswall){
        queue.unshift({x:c.x ,y:c.y-1})
        prevmap[`${c.x}-${c.y-1}`]={...c}
        hashmap[`${c.x}-${c.y-1}`]=true
      }
      if(c.x+1 < 50 && !hashmap[`${c.x+1}-${c.y}`] && !graph[c.y][c.x+1].iswall){
        queue.unshift({x:c.x +1,y:c.y})
        prevmap[`${c.x+1}-${c.y}`]={...c}
        hashmap[`${c.x+1}-${c.y}`]=true
      }
    }
    return null
  }

 useEffect(()=>{

if (algo == 'BFS'){
  let hashmap={}
  let prevmap={}
  for (let j=0;j<25;j++){
   for (let i=0;i<50;i++){
     hashmap[`${i}-${j}`]=false
     prevmap[`${i}-${j}`]=null
   }
 }
 let result=BFS(grid,hashmap,prevmap,start.current,end.current)
 let path=[]
 if (result !=null){
  let current=result[0]
  while (prevmap[`${current.x}-${current.y}`] != null){
    path.push(current)
    current=prevmap[`${current.x}-${current.y}`]
  }
  setTimeout(()=>{path.reverse().forEach((elem,index)=>{
    refarray[elem.x+elem.y*50].current.style['transition-delay']=`${( index) * 15}ms`
      refarray[elem.x+elem.y*50].current.classList.add('path')
  })},result[1]*9)
  
 }
  
 
}
// Clear previous visualizations
refarray.forEach((ref) => {
  ref.current.classList.remove('path', 'visited');
});

if (algo === 'A*') {
  const path = aStar(grid, start.current, end.current);
  if (path) {
    // Visualize the path
    path.forEach(node => {
      const nodeIndex = node.x + node.y * 50; // Assuming grid is 50 cells wide
      refarray[nodeIndex].current.classList.add('path');
    });
  }
}
 },[run])

 useEffect(()=>{
  refarray.forEach((elem)=>{elem.current.style['transition-delay']='0ms'})
  refarray.forEach((elem)=>{elem.current.classList.remove('visited');elem.current.classList.remove('path')})
 },[res])

  return (
    <div className='board'>
      {refarray.map((elem,index)=> {
        let classList=['cell']

        let yindex=Math.floor(index/50)
        let xindex=index % 50
        let cell=grid[yindex][xindex]

        if (cell.iswall) {
          classList.push('wall')
        }
        
        return <div key={`${index}`} ref={elem}  className={classList.join(' ')} 
        onMouseDown={()=>{seteditFlag(true)}} onMouseUp={()=>{seteditFlag(false)}}
        onMouseMove={()=>{
          if (!editing) return
          const current= grid[yindex][xindex]
           if (current.isstart || current.istarget ) return
           switch(mode){
            case 'setstart':
              var newgrid=grid.map((elem)=>{
              return elem.map((elem)=>{
                if (!elem.isstart) return elem
                return {...elem,isstart:false}
              }) 
             })
             newgrid[yindex][xindex]={...newgrid[yindex][xindex],isstart:true,istarget:false,weight:1,iswall:false}
             start.current={x:xindex,y:yindex}
             setgrid(newgrid)
             break;

           case 'settarget':
                var newgrid=grid.map((elem)=>{
                return elem.map((elem)=>{
                  if (!elem.istarget) return elem
                  return {...elem,istarget:false}
                }) 
               })
               newgrid[yindex][xindex]={...newgrid[yindex][xindex],isstart:false,istarget:true,weight:1,iswall:false}
               end.current={x:xindex,y:yindex}
               setgrid(newgrid)
               break;

             case 'addbricks':
                var newgrid=grid.slice()
               newgrid[yindex][xindex]={...newgrid[yindex][xindex],weight:1,iswall:true}
               setgrid(newgrid)
               break;

           default:
             return 
            }}}>
         

          {cell.weight > 1 ? <i className="bi bi-virus"></i> : null}
          {cell.isstart ? <i className="bi bi-geo-alt"></i> : null }
          {cell.istarget ? <i className="bi bi-geo"></i> : null }
          
         </div>
      })}
    </div>
  )
}
