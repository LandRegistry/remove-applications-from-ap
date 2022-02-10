const express = require('express')
const router = new express.Router()

// Search applications from default session data file and render details or error
router.post('/find', (req, res) => {
  const search = req.session.data['find'].replace(/ /g, '').toUpperCase()
  const application = req.session.data['applications'].filter(application => application.abr === search)

  res.locals.application = application[0]

//  console.log('appn:'+application[0].status)

  if (search.length == 0) {
    res.render('v4/find', {
      error: 'Enter an Application Barcode Reference'
    })
  } else {
    if (application == false) {
      res.render('v4/find', {
        error: 'There is no application with this ABR in Application Processing'
      })
    } else {

			if (application[0].status == 'available') {
				res.redirect('can-remove')
			}
			else {
				res.redirect('cant-remove')
			}
    }
  }
})

router.post('/can-remove', (req, res) => {
  res.redirect('confirmation');
})

router.post('/cant-remove', (req, res) => {
  res.redirect('find');
})




// Add your routes above the module.exports line
module.exports = router
