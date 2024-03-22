package br.com.coffre.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class FormatedDate {
    
    String date = "";

    // return date dd/mm/yyyy
    public String verifyDate(){
        Date currentDate = new Date();
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
        date = (format.format(currentDate));
        return date;
    }

    // return complete date
    public String verifyCompleteDate(){
        Date currentDate = new Date();
        DateFormat dateFull = DateFormat.getDateInstance(DateFormat.FULL);
        date = (dateFull.format(currentDate));
        return date;
    }
}

