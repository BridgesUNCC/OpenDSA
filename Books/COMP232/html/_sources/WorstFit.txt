.. _WorstFit:

.. raw:: html

   <script>ODSA.SETTINGS.DISP_MOD_COMP = true;ODSA.SETTINGS.MODULE_NAME = "WorstFit";ODSA.SETTINGS.MODULE_LONG_NAME = "Worst Fit";ODSA.SETTINGS.MODULE_CHAPTER = "Memory Management"; ODSA.SETTINGS.BUILD_DATE = "2017-11-27 23:03:58"; ODSA.SETTINGS.BUILD_CMAP = false;JSAV_OPTIONS['lang']='en';JSAV_EXERCISE_OPTIONS['code']='java_generic';</script>


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

Worst Fit
=========

Worst Fit
---------

A strategy contrary to best fit might make sense because it tends to
minimize the effects of external fragmentation.
This is called :term:`worst fit`, which always allocates the largest
block on the list hoping that the remainder of the block will be
useful for servicing a future request.
In our example, the worst fit is the block of size 45, leaving a
remainder of size 15.
If there are a few unusually large requests, this approach
will have less chance of servicing them.
If requests generally tend to be of the same size, then this might be
an effective strategy.
Like best fit, worst fit requires searching the entire freelist at
each memory request to find the largest block.
Alternatively, the freelist can be ordered from largest to smallest
free block, possibly by using a priority queue implementation.

.. avembed:: AV/MemManage/firstFitAV.html ss
   :module: WorstFit
   :points: 0
   :required: False
   :showhide: none
   :threshold: 1.0
   :exer_opts: JOP-lang=en&amp;fitAlgorithm=4&amp;JXOP-code=java_generic
   :long_name: Worst Fit Visualization
