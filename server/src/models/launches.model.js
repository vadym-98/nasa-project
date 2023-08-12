const launches = new Map()

let latestFlightNumber = 100

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocketName: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: [
        'ZTM',
        'NASA',
    ],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch)

function existsLaunchWithId(launchId) {
    return launches.has(launchId)
}

function getAllLaunches() {
    return Array.from(launches.values())
}

function addNewLaunch(launch) {
    latestFlightNumber++
    launches.set(latestFlightNumber, Object.assign(launch, {
        customers: ['Zero to Mastery', 'NASA'],
        flightNumber: latestFlightNumber,
        upcoming: true,
        success: true,
    }))
}

function abortLaunchById(id) {
    const aborted = launches.get(id)
    aborted.upcoming = false
    aborted.success = false

    return aborted
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
}