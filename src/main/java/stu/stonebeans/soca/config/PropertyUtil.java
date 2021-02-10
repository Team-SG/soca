package stu.stonebeans.soca.config;

import org.springframework.context.ApplicationContext;

public class PropertyUtil {
    public static String getProperty(String propertyName) {
        return getProperty(propertyName, null);
    }

    public static String getProperty(String propertyName, String defaultValue) {
        ApplicationContext applicationContext = ApplicationContextServe.getApplicationContext();
        if(applicationContext.getEnvironment().getProperty(propertyName) != null) {
            return applicationContext.getEnvironment().getProperty(propertyName).toString();
        } else {
            return null;
        }
    }
}
