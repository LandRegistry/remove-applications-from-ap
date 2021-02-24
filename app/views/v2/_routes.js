const express = require('express')
const router = new express.Router()

// Search applications from default session data file and render details or error
router.post('/find', (req, res) => {
  const search = req.session.data['find'].replace(/ /g, '').toUpperCase()
  const application = req.session.data['applications'].filter(application => application.abr === search)

  res.locals.application = application[0]

  if (search.length == 0) {
    res.render('v2/find', {
      error: 'Enter an Application Barcode Reference'
    })
  } else {
    if (application == false) {
      res.render('v2/find', {
        error: 'You have entered an invalid ABR or the application is not in Application Processing, check the current ESRV queue in General Enquiries'
      })
    } else {
      res.render('v2/result')
    }
  }
})

router.post('/submit', (req, res) => {
  const find = req.session.data['find'].replace(/ /g, '').toUpperCase()

  if (find == 'A123') {
    res.redirect('confirmation');
  } else {
    res.redirect('processing');
  }
})




// Add your routes above the module.exports line
module.exports = router
