package stu.stonebeans.soca.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import stu.stonebeans.soca.sbo.ScheduleSBO;

import java.util.List;

@RestController
public class ScheduleController {

    private ScheduleSBO scheduleSBO;

    @Autowired
    public ScheduleController(ScheduleSBO scheduleSBO) {
        this.scheduleSBO = scheduleSBO;
    }

    @RequestMapping(value = "/getYearSemester", method = RequestMethod.POST)
    public List<String> getYearSemester() {
        return scheduleSBO.getYearSemester();
    }
}
