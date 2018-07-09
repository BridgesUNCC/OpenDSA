.. _CircularFit:

.. raw:: html

   <script>ODSA.SETTINGS.DISP_MOD_COMP = true;ODSA.SETTINGS.MODULE_NAME = "CircularFit";ODSA.SETTINGS.MODULE_LONG_NAME = "Circular First Fit";ODSA.SETTINGS.MODULE_CHAPTER = "Memory Management"; ODSA.SETTINGS.BUILD_DATE = "2017-11-27 23:03:58"; ODSA.SETTINGS.BUILD_CMAP = false;JSAV_OPTIONS['lang']='en';JSAV_EXERCISE_OPTIONS['code']='java_generic';</script>


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

Circular First Fit
==================

Circular First Fit
------------------
A simple variation that will improve performance is, instead of
always beginning at the head of the freelist, remember the last
position reached in the previous search and start from there.
When the end of the freelist is reached, search begins again at the
head of the freelist.
This modification reduces the number of unnecessary searches through
small blocks that were passed over by previous requests.

.. avembed:: AV/MemManage/firstFitAV.html ss
   :module: CircularFit
   :points: 0
   :required: False
   :showhide: none
   :threshold: 1.0
   :exer_opts: JOP-lang=en&amp;fitAlgorithm=2&amp;JXOP-code=java_generic
   :long_name: Circular First Fit Visualization
