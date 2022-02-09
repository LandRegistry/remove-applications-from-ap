const express = require('express')
const router = new express.Router()

// Search applications from default session data file and render details or error
router.post('/find', (req, res) => {
  const search = req.session.data['find'].replace(/ /g, '').toUpperCase()
  const application = req.session.data['applications'].filter(application => application.abr === search)

  res.locals.application = application[0]

  if (search.length == 0) {
    res.render('v4/find', {
      error: 'Enter an Application Barcode Reference'
    })
  } else {
    if (application == false) {
      res.render('v4/find', {
        error: 'You have entered an invalid ABR or the application is not in Application Processing, check the current ESRV queue in General Enquiries'
      })
    } else {
      res.render('v4/result')
    }
  }
})

router.post('/submit', (req, res) => {
  const office = req.session.data['office']
  const team = req.session.data['team']

  if (office == 'Select office') {
    res.render('v4/result', {
      errorOffice: 'Select an office'
    })
  } else if (team == 'Select team') {
    res.render('v4/result', {
      errorTeam: 'Select a team'
    })
  } else {
    res.redirect('processing');
  }
})




// Add your routes above the module.exports line
module.exports = router
