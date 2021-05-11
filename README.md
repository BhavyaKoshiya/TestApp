# testApp

if react-native-admob-native-ads show error like this one
ERROR:
> What went wrong:
>Execution failed for task ':react-native-admob-native-ads:compileDebugJavaWithJavac'.
> Compilation failed; see the compiler error output for details.

then
SOLUTION:
 in node-modules of react-native-admob-native-ads > android> gradle file replace this line
 
  implementation "com.google.android.gms:play-services-ads:+"
 with this one
  implementation ("com.google.android.gms:play-services-ads:19.8.0") { force = true; }
