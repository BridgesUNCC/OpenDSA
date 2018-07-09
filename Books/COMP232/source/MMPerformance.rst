.. _MMPerformance:

.. raw:: html

   <script>ODSA.SETTINGS.DISP_MOD_COMP = true;ODSA.SETTINGS.MODULE_NAME = "MMPerformance";ODSA.SETTINGS.MODULE_LONG_NAME = "Sequential Fit Performance";ODSA.SETTINGS.MODULE_CHAPTER = "Memory Management"; ODSA.SETTINGS.BUILD_DATE = "2017-11-27 23:03:58"; ODSA.SETTINGS.BUILD_CMAP = false;JSAV_OPTIONS['lang']='en';JSAV_EXERCISE_OPTIONS['code']='java_generic';</script>


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

Sequential Fit Peformance
=========================

Sequential Fit Peformance
-------------------------

Which sequential fit strategy is best depends on the expected types of
memory requests.
If the requests are of widely ranging size, best fit might work well.
If the requests tend to be of similar size, with rare large and small
requests, first or worst fit might work well.
Unfortunately, there are always request patterns that one of the
three sequential fit methods will service, but which the other two
will not be able to service.
For example, if the series of requests 600, 650, 900, 500, 100 is
made to a freelist containing blocks 500, 700, 650, 900
(in that order), 
the requests can all be serviced by first fit, but not by best fit.
Alternatively, the series of requests 600, 500, 700, 900 can be
serviced by best fit but not by first fit on this same freelist.

.. avembed:: AV/MemManage/firstFitAV.html ss
   :module: MMPerformance
   :points: 0
   :required: False
   :showhide: none
   :threshold: 1.0
   :exer_opts: JOP-lang=en&amp;JXOP-code=java_generic
   :long_name: Sequential Fit Visualization
