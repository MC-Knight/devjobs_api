import { type Request, type Response } from "express";
import _ from "lodash";
import { validateRequirements } from "../helpers/validate";
import prisma from "../prisma";

class RequirementController {
  static async createRequirement(req: Request, res: Response) {
    const { error } = validateRequirements(req.body);
    if (error !== undefined) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const job = await prisma.job.findUnique({
      where: {
        id: parseInt(req.body.jobId),
      },
    });

    if (job === null) {
      return res.status(404).json({
        error: "Job not found",
      });
    }

    const newRequirement = await prisma.requirement.create({
      data: {
        ..._.pick(req.body, ["content", "items"]),
        job: {
          connect: {
            id: parseInt(req.body.jobId),
          },
        },
      },
    });

    res.status(201).json({
      message: "Requirement created successfully",
      data: newRequirement,
    });
  }

  static async updateRequirement(req: Request, res: Response) {
    const { error } = validateRequirements(req.body);
    if (error !== undefined) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const jobId = req.body.jobId;

    const requirement = await prisma.requirement.findUnique({
      where: {
        jobId: parseInt(jobId),
      },
    });

    if (requirement === null) {
      return res.status(404).json({
        error: "Requirement not found",
      });
    }

    const updatedRequirement = await prisma.requirement.update({
      where: {
        jobId: parseInt(jobId),
      },
      data: {
        ..._.pick(req.body, ["content", "items"]),
      },
    });

    res.status(200).json({
      message: "Requirement updated successfully",
      data: updatedRequirement,
    });
  }
}

export default RequirementController;
