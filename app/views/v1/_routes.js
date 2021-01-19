const express = require('express')
const router = new express.Router()

// Search applications from default session data file and render details or error
router.post('/find', (req, res) => {
  const search = req.session.data['find'].replace(/ /g, '').toUpperCase()
  const application = req.session.data['applications'].filter(application => application.abr === search)

  res.locals.application = application[0]

  if (search.length == 0) {
    res.render('v1/find', {
      error: 'Enter an Application Barcode Reference'
    })
  } else {
    if (application == false) {
      res.render('v1/find', {
        error: 'Check the Application Barcode Reference is correct'
      })
    } else {
      res.render('v1/result')
    }
  }
})




// Add your routes above the module.exports line
module.exports = router
