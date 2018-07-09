.. _BestFit:

.. raw:: html

   <script>ODSA.SETTINGS.DISP_MOD_COMP = true;ODSA.SETTINGS.MODULE_NAME = "BestFit";ODSA.SETTINGS.MODULE_LONG_NAME = "Best Fit";ODSA.SETTINGS.MODULE_CHAPTER = "Memory Management"; ODSA.SETTINGS.BUILD_DATE = "2017-11-27 23:03:58"; ODSA.SETTINGS.BUILD_CMAP = false;JSAV_OPTIONS['lang']='en';JSAV_EXERCISE_OPTIONS['code']='java_generic';</script>


.. |--| unicode:: U+2013   .. en dash
.. |---| unicode:: U+2014  .. em dash, trimming surrounding whitespace
   :trim:


.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :topic: Memory Management

Best Fit
========

Best Fit
--------

There is a potential disadvantage to first fit:
It might "waste" larger blocks by breaking them up, and so they will
not be available for large requests later.
A strategy that avoids using large blocks unnecessarily is called
:term:`best fit`.
Best fit looks at the entire list and picks the smallest block that
is at least as large as the request 
(i.e., the "best" or closest fit to the request).
Continuing with the preceding example, the best fit for a request of
30 units is the block of size 32, leaving a remainder of size 2.
Best fit has the disadvantage that it requires that the entire list be
searched.
Another problem is that the remaining portion of the best-fit block
is likely to be small, and thus useless for future requests.
In other words, best fit tends to maximize problems of external
fragmentation while it minimizes the chance of not being able to
service an occasional large request.

.. avembed:: AV/MemManage/firstFitAV.html ss
   :module: BestFit
   :points: 0
   :required: False
   :showhide: none
   :threshold: 1.0
   :exer_opts: JOP-lang=en&amp;fitAlgorithm=3&amp;JXOP-code=java_generic
   :long_name: Best Fit Visualization
