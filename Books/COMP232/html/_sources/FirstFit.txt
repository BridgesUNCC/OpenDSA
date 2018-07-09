.. _FirstFit:

.. raw:: html

   <script>ODSA.SETTINGS.DISP_MOD_COMP = true;ODSA.SETTINGS.MODULE_NAME = "FirstFit";ODSA.SETTINGS.MODULE_LONG_NAME = "First Fit";ODSA.SETTINGS.MODULE_CHAPTER = "Memory Management"; ODSA.SETTINGS.BUILD_DATE = "2017-11-27 23:03:58"; ODSA.SETTINGS.BUILD_CMAP = false;JSAV_OPTIONS['lang']='en';JSAV_EXERCISE_OPTIONS['code']='java_generic';</script>


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

First Fit
=========

First Fit
---------

The simplest method for selecting a block would be to move down the
free block list until a block of size at least 30 is found.
Any remaining space in this block is left on the freelist.
If we begin at the beginning of the list and work down to the first
free block at least as large as 30, we select the block of size 35.
30 units of storage will be allocated, leaving a free block with 5
units of space. 
Because this approach selects the first block with enough space, it is
called :term:`first fit`.

.. avembed:: AV/MemManage/firstFitAV.html ss
   :module: FirstFit
   :points: 0
   :required: False
   :showhide: none
   :threshold: 1.0
   :exer_opts: JOP-lang=en&amp;fitAlgorithm=1&amp;JXOP-code=java_generic
   :long_name: First Fit Visualization

Now try it for yourself with the following exercise.

.. avembed:: AV/MemManage/firstFitPRO.html pe
   :module: FirstFit
   :points: 2.0
   :required: True
   :threshold: 0.9
   :exer_opts: JOP-lang=en&amp;JXOP-code=java_generic
   :long_name: First Fit Proficiency Exercise
