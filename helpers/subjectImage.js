export const getSubjectImage = (subCode) => {
  switch (subCode) {
    case "CHM1002": return require('../assets/subject/ic_subject_environmental_studies.png')
    case "CSE1002": return require('../assets/subject/ic_subject_maths.png')
    case "CSE1011": return require('../assets/subject/ic_subject_electrical.png')
    case "CSE2031": return require('../assets/subject/ic_subject_maths.png')
    case "CSE3151": return require('../assets/subject/ic_subject_database.png')
    case "CSE4042": return require('../assets/subject/ic_subject_network.png')
    case "CSE4043": return require('../assets/subject/ic_subject_security.png')
    case "CSE4044": return require('../assets/subject/ic_subject_security.png')
    case "CSE4051": return require('../assets/subject/ic_subject_database.png')
    case "CSE4052": return require('../assets/subject/ic_subject_database.png')
    case "CSE4053": return require('../assets/subject/ic_subject_database.png')
    case "CSE4054": return require('../assets/subject/ic_subject_database.png')
    case "CSE4102": return require('../assets/subject/ic_subject_html.png')
    case "CSE4141": return require('../assets/subject/ic_subject_android.png')
    case "CSE4151": return require('../assets/subject/ic_subject_server.png')
    case "CVL3071": return require('../assets/subject/ic_subject_traffic.png')
    case "CVL3241": return require('../assets/subject/ic_subject_water.png')
    case "CVL4031": return require('../assets/subject/ic_subject_earth.png')
    case "CVL4032": return require('../assets/subject/ic_subject_soil.png')
    case "CVL4041": return require('../assets/subject/ic_subject_water.png')
    case "CVL4042": return require('../assets/subject/ic_subject_water.png')
    case "EET1001": return require('../assets/subject/ic_subject_matlab.png')
    case "EET3041": return require('../assets/subject/ic_subject_electromagnetic_waves.png')
    case "EET3061": return require('../assets/subject/ic_subject_communication.png')
    case "EET3062": return require('../assets/subject/ic_subject_communication.png')
    case "EET4014": return require('../assets/subject/ic_subject_renewable_energy.png')
    case "EET4041": return require('../assets/subject/ic_subject_electromagnetic_waves.png')
    case "EET4061": return require('../assets/subject/ic_subject_wifi.png')
    case "EET4063": return require('../assets/subject/ic_subject_communication.png')
    case "EET4161": return require('../assets/subject/ic_subject_communication.png')
    case "HSS1001": return require('../assets/subject/ic_subject_effective_speech.png')
    case "HSS1021": return require('../assets/subject/ic_subject_economics.png')
    case "HSS2021": return require('../assets/subject/ic_subject_economics.png')
    case "MEL3211": return require('../assets/subject/ic_subject_water.png')
    case "MTH2002": return require('../assets/subject/ic_subject_probability_statistics.png')
    case "MTH4002": return require('../assets/subject/ic_subject_matlab.png')
}

switch (subCode.substring(0, Math.min(subCode.length, 3))) {
    case "CHM": return require('../assets/subject/ic_subject_chemistry.png')
    case "CSE": return require('../assets/subject/ic_subject_computer.png')
    case "CVL": return require('../assets/subject/ic_subject_civil.png')
    case "EET": return require('../assets/subject/ic_subject_electrical.png')
    case "HSS": return require('../assets/subject/ic_subject_humanities.png')
    case "MEL": return require('../assets/subject/ic_subject_mechanical.png')
    case "MTH": return require('../assets/subject/ic_subject_maths.png')
    case "PHY": return require('../assets/subject/ic_subject_physics.png')
}

return require('../assets/subject/ic_subject_generic.png');
}

export const getVideoImage = (subCode) => {
  switch (subCode.substring(0, Math.min(subCode.length, 3))) {
    case "CHM": return require('../assets/videoThumb/physics.png')
    case "CSE": return require('../assets/videoThumb/programming.png')
    case "CVL": return require('../assets/videoThumb/physics.png')
    case "EET": return require('../assets/videoThumb/circuit.png')
    case "HSS": return require('../assets/videoThumb/evs.png')
    case "MEL": return require('../assets/videoThumb/physics.png')
    case "MTH": return require('../assets/videoThumb/math.png')
    case "PHY": return require('../assets/videoThumb/physics.png')
}

return require('../assets/videoThumb/programming.png');
}