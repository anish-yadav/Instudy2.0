export const classRequired = (theo='0/0', prac='0/0', goal=75) => {
  if (theo.match('Not'))
    theo = '0/0'
  else if (prac.match('Not'))
    prac = '0/0'

  var totalClass = parseInt(theo.split('/')[1]) + parseInt(prac.split('/')[1])
  var classAttended = parseInt(theo.split('/')[0]) + parseInt(prac.split('/')[0])
  let x = 0
  var curr = Math.floor(((classAttended+x)/(totalClass+x)*100))
  if(curr < goal)
  while(curr < goal && x < 20){
    x = x+1
    curr = Math.floor(((classAttended+x)/(totalClass+x)*100))
  }
  else 
  while(curr >= goal){
    x = x-1
    curr = Math.floor(((classAttended+x)/(totalClass+x)*100))
  }

  return x
}

export const heplerString = (theo='0/0', prac='0/0', goal=75) => {

  var reqClass = classRequired(theo,prac,goal)
  
  if(reqClass > 0 && reqClass < 18){
    return `Need ${reqClass} more classes to get ${goal}%`
  }else if(reqClass >= 18)
    return `Do not bunk any more classes`
  else 
    return `Bunk ${Math.abs(reqClass)} classes to get ${goal}%`
}